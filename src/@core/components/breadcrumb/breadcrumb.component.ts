import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET } from "@angular/router";
import "rxjs/add/operator/filter";
import { IBreadcrumb } from "./breadcrumb.model";
import { BreadcrumbsService } from "./breadcrumb.service";
import { distinctUntilChanged, map } from 'rxjs/operators';
import { pipe } from "rxjs";


@Component({
    selector: "breadcrumb",
    templateUrl: './breadcrumb.component.html',
    styles: ['./breadcrumb.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class BreadcrumbComponent implements OnInit {

    // The breadcrumbs of the current route
    private currentBreadcrumbs: IBreadcrumb[];
    // All the breadcrumbs
    public breadcrumbs: IBreadcrumb[];

    @Input()
    public allowBootstrap: boolean;

    @Input()
    public addClass: string;


    public constructor(private breadcrumbService: BreadcrumbsService, private activatedRoute: ActivatedRoute, private router: Router) {
        // breadcrumbService.get().subscribe((breadcrumbs: IBreadcrumb[]) => {
        //     this.breadcrumbs = breadcrumbs as IBreadcrumb[];
        //     console.log(this.breadcrumbs);
        // });

       
    }

    breadcrumbs$ = this.router.events
    .filter(event => event instanceof NavigationEnd).pipe(map(event => this.buildBreadCrumb(this.activatedRoute.root)));


    public hasParams(breadcrumb: IBreadcrumb) {
        return Object.keys(breadcrumb.params).length ? [breadcrumb.url, breadcrumb.params] : [breadcrumb.url];
    }

    buildBreadCrumb(route: ActivatedRoute, url: string = '',
        breadcrumbs: Array<IBreadcrumb> = []): Array<IBreadcrumb> {
        // If no routeConfig is avalailable we are on the root path
        const label = route.routeConfig ? route.routeConfig.data['breadcrumb'] : 'Home';
        const path = route.routeConfig ? route.routeConfig.path : '';
        // In the routeConfig the complete path is not available,
        // so we rebuild it each time
        const nextUrl = `${url}${path}/`;
        const breadcrumb = {
            label: label,
            url: nextUrl
        };
        const newBreadcrumbs = [...breadcrumbs, breadcrumb];
        if (route.firstChild) {
            // If we are not on our current path yet,
            // there will be more children to look after, to build our breadcumb
            return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
        }
        return newBreadcrumbs;
    }


    public ngOnInit() {
        const ROUTE_DATA_BREADCRUMB: string = "breadcrumb";
        const ROUTE_PARAM_BREADCRUMB: string = "breadcrumb";
        const PREFIX_BREADCRUMB: string = "prefixBreadcrumb";

        // subscribe to the NavigationEnd event
        this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
            // reset currentBreadcrumbs
            this.currentBreadcrumbs = [];


            // get the root of the current route
            let currentRoute: ActivatedRoute = this.activatedRoute.root;


            // set the url to an empty string
            let url: string = "";

            // iterate from activated route to children
            while (currentRoute.children.length > 0) {
                let childrenRoutes: ActivatedRoute[] = currentRoute.children;
                let breadCrumbLabel: string = "";

                // iterate over each children
                childrenRoutes.forEach(route => {
                    // Set currentRoute to this route
                    currentRoute = route;
                    // Verify this is the primary route
                    if (route.outlet !== PRIMARY_OUTLET) {
                        return;
                    }

                    const hasData = (route.routeConfig && route.routeConfig.data);
                    const hasDynamicBreadcrumb: boolean = route.snapshot.params.hasOwnProperty(ROUTE_PARAM_BREADCRUMB);

                    if (hasData || hasDynamicBreadcrumb) {


                        /*
                         Verify the custom data property "breadcrumb"
                         is specified on the route or in its parameters.
                         Route parameters take precedence over route data
                         attributes.
                         */
                        if (hasDynamicBreadcrumb) {
                            breadCrumbLabel = route.snapshot.params[ROUTE_PARAM_BREADCRUMB].replace(/_/g, " ");
                        } else if (route.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
                            breadCrumbLabel = route.snapshot.data[ROUTE_DATA_BREADCRUMB];
                        }

                        // Get the route's URL segment
                        let routeURL: string = route.snapshot.url.map(segment => segment.path).join("/");
                        url += `/${routeURL}`;

                        // Cannot have parameters on a root route
                        if (routeURL.length === 0) {
                            route.snapshot.params = {};
                        }


                        // Add breadcrumb
                        let breadcrumb: IBreadcrumb = {
                            label: breadCrumbLabel,
                            params: route.snapshot.params,
                            url: url
                        };

                        // Add the breadcrumb as 'prefixed'. It will appear before all breadcrumbs
                        if (route.snapshot.data.hasOwnProperty(PREFIX_BREADCRUMB)) {
                            this.breadcrumbService.storePrefixed(breadcrumb);
                        }
                        else {
                            this.currentBreadcrumbs.push(breadcrumb);
                        }

                    }

                });

                this.breadcrumbService.store(this.currentBreadcrumbs);
            }
        });
    }
}