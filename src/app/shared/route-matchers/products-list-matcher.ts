import type {UrlMatcher} from '@angular/router';

export const productsListMatcher: UrlMatcher = segments => {
    if (segments?.[0].path === 'products-list') {
        const urlMatchResult = {consumed: segments};

        return segments[1]
            ? {
                  ...urlMatchResult,
                  posParams: {categoryId: segments[1]},
              }
            : urlMatchResult;
    }

    return null;
};
