export interface ItemLeftSideBar {
    icon?: JSX.Element;
    name: string;

}

export interface ListItemSideBar {
    parent: ItemLeftSideBar;
    childrenItems?: ItemLeftSideBar[]
}


export interface DropOutSideBarItem {
    icon: JSX.Element;
    title: string
    childrenItem: DropOutSideBarItem[]
    link?: string
}