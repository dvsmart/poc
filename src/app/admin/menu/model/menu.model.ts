export class MenuGroupModel {
    id: number;
    name: string;
}

export class MenuItemModel {
    caption: string;
    route: string;
    hasChildren: boolean;
    className: string;
    iconName: string;
    isVisible: boolean;
    sortOrder: number;
    menuGroupId: number;
    parentId: number;
    id: number | 0;
    addedDate: Date;
    modifiedDate: Date;
    dataId: string;
    groupName: string

    /**
     *
     */
    constructor(data?) {
        data = data || {};
        this.id = data.id | 0;
        this.caption = data.title;
        this.iconName = data.icon;
        this.hasChildren = data.hasChildren || false;
        this.sortOrder = data.sortOrder;
        this.menuGroupId = data.groupId;
        this.parentId = data.parentId;
        this.isVisible = data.isVisible || true;
        this.route = data.route;
        this.groupName = data.menuGroupName != undefined ? data.menuGroupName : '';
    }
}

export class MenuItem {
    id: number;
    name: string;

    constructor(data?) {
        data = data || {};
        this.id = data.id;
        this.name = data.title;
    }


}