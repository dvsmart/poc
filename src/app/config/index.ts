import { Config } from "@core/types/config";

export const fuseConfig: Config = {
    // Color themes can be defined in src/app/app.theme.scss
    colorTheme      : 'theme-pink-dark',
    customScrollbars: true,
    layout          : {
        style    : 'vertical-layout-2',
        width    : 'fullwidth',
        navbar   : {
            primaryBackground  : 'fuse-navy-700',
            secondaryBackground: 'fuse-navy-900',
            folded             : false,
            hidden             : false,
            position           : 'left',
            variant            : 'vertical-style-2'
        },
        toolbar  : {
            customBackgroundColor: false,
            background           : 'fuse-navy-600',
            hidden               : false,
            position             : 'below-static'
        },
        footer   : {
            customBackgroundColor: true,
            background           : 'fuse-navy-900',
            hidden               : false,
            position             : 'below-fixed'
        },
        sidepanel: {
            hidden  : false,
            position: 'right'
        }
    }
};