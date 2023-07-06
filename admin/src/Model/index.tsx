export interface ItemLeftSideBar {
    icon?: JSX.Element;
    name: string;

}

export interface ListItemSideBar {
    parent: ItemLeftSideBar;
    childrenItems?: ItemLeftSideBar[]
}