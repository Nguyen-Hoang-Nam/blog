import * as lozad from "lozad";

const lazyLoadImage = lozad(".lozad", {
    loaded: function (el: any) {
        if (el.dataset.alt) {
            el.alt = el.dataset.alt;
        }
    },
});

lazyLoadImage.observe();
