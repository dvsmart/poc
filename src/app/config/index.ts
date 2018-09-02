import { Config } from "@core/types/config";

export const fuseConfig: Config = {
    layout          : {
        style    : 'vertical-layout-1',
        width    : 'fullwidth',
        navbar   : {
            background: 'mat-fuse-dark-700-bg',
            folded    : false,
            hidden    : false,
            position  : 'left',
            variant   : 'vertical-style-2'
        },
        toolbar  : {
            background: 'mat-white-500-bg',
            hidden    : false,
            position  : 'below-static'
        },
        footer   : {
            background: 'mat-fuse-dark-900-bg',
            hidden    : true,
            position  : 'below-fixed'
        },
        sidepanel: {
            hidden  : false,
            position: 'right'
        }
    },
    customScrollbars: false
};