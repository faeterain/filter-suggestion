interface DynamicObject {
    [key:string]:any;
}
export interface ISuggestionFilter {
    /**
     * List of data item 
     */
    itemsWithImg?: DynamicObject[];
    /**
     * Number of items with image showed in search result popup
     */
    limitItemsWithImg?: number;
    limitSuggestion?: number;
    limitCollection?: number;
    order?: string[];
    minSearchLetter?: number;
    customProduction?: any;
}