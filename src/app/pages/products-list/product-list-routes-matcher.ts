import {UrlSegment} from '@angular/router';

export const productListRoutesMatcher = (segments: UrlSegment[]) => {
    if (segments.length === 0) {
        return {consumed: [new UrlSegment('product-list', {})]};
    }

    if (segments[0].path === 'products-list') {
        return {
            consumed: segments,
            ...(segments[1] && {posParams: {subCategoryId: segments[1]}}),
        };
    }

    return null;
};
