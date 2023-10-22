var app = new Vue({
    el: "#app",
    data: {
        activities: activities,
        sortByProperty: "price",
        sortOrder: "ascending",
        searchKeyword: "",
    },
    methods: {
        /* This is responsible for sorting the `activities` array based on the 
        `sortByProperty`(title, location, price, space) and `sortOrder`(ascending, decending) 
        data properties. */
        sortActivities: function (activities) {
            return activities.sort((a, b) => {
                let aRefined = a[this.sortByProperty], bRefined = b[this.sortByProperty];

                if (typeof a[this.sortByProperty] === "string") {
                    aRefined = a[this.sortByProperty].toLowerCase();
                    bRefined = b[this.sortByProperty].toLowerCase();
                }

                return aRefined > bRefined
            })
        },
        /* The `searchActivities` function is responsible for filtering the `activities` array based on
        the `searchKeyword` data property. */
        searchActivities: function (activities) {
            return activities.filter((activity) => {
                return this.searchKeyword.toLowerCase().split(" ").every(v => activity.title.toLowerCase().includes(v)) ||
                    this.searchKeyword.toLowerCase().split(" ").every(v => activity.location.toLowerCase().includes(v))
            })
        }
    },
    computed: {
        filteredActivities: function () {
            return this.sortActivities(this.searchActivities(this.activities));
        }
    }
})