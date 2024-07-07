import { FilterType } from "@/types/filter-types";
import { PriorityTypes } from "@/types/priority-types";

export function getCategoryByType(type: FilterType){
    if(type == FilterType.SOCKS) return "socks"
    if(type == FilterType.SHIRT) return "t-shirts"
    return ""
}

export function getFieldByPriority(priority: PriorityTypes){
    if(priority === PriorityTypes.NEWS) return {field: "created_at", order: "ASC"}
    if(priority === PriorityTypes.BIGGEST_PRICE)  return {field: "price_in_cents", order: "ASC"}
    if(priority === PriorityTypes.MINOR_PRICE) return {field: "price_in_cents", order: "ASC"}
    return {field: "sales", order: "DSC"}
}

export const mountQuery = (type: FilterType, priority: PriorityTypes) => {
    if(type === FilterType.ALL && priority === PriorityTypes.POPULARITY) return `query {
        products(sortField: "sales", sortOrder: "DSC") {
        
          name
          price
          image_url
        }
      }
    `
    const sortSettings = getFieldByPriority(priority)
    const categoryFilter = getCategoryByType(type)
    return `
    query {
        products(sortField: "${sortSettings.field}", sortOrder: "${sortSettings.order}", ${categoryFilter ? `filter: { category: "${categoryFilter}"}`: ''}) {
          
          name
          price
          image_url
          sport
        }
      }
    `
}