var app = new Vue({
    el: "#app",
    data: {
        activities: activities,
        sortByProperty: "title",
        sortOrder: "ascending",
        searchKeyword: "",
        cart: [],
        viewActivities: true
    },
    methods: {
        /* This is responsible for sorting the `activities` array based on the 
        `sortByProperty`(title, location, price, space) and `sortOrder`(ascending, decending) 
        data properties. */
        sortActivities: function (activities, order) {
            return activities.sort((a, b) => {
                let aRefined = a[this.sortByProperty], bRefined = b[this.sortByProperty];

                if (typeof a[this.sortByProperty] === "string") {
                    aRefined = a[this.sortByProperty].toLowerCase();
                    bRefined = b[this.sortByProperty].toLowerCase();
                }

                return order === "ascending" ? aRefined > bRefined :  aRefined < bRefined;
            })
        },
        /* The `searchActivities` function is responsible for filtering the `activities` array based on
        the `searchKeyword` data property. */
        searchActivities: function (activities) {
            return activities.filter((activity) => {
                return this.searchKeyword.toLowerCase().split(" ").every(v => activity.title.toLowerCase().includes(v)) ||
                    this.searchKeyword.toLowerCase().split(" ").every(v => activity.location.toLowerCase().includes(v))
            })
        },
        /* The `addToCart` function is responsible for adding an activity to the cart. */
        addToCart: function (activity) {
            let itemInCart = this.cart.find(item => item.id === activity.id);

            if (!itemInCart) {
                let newItemInCart = {
                    ...activity,
                    spaces: 0
                }

                this.cart.push(newItemInCart);
            }

            this.activities = this.activities.map(item => {
                if (item.id === activity.id) return {...item, spaces: item.spaces - 1}
                return item
            });

            this.cart = this.cart.map(item => {
                if (item.id === activity.id) return {...item, spaces: item.spaces + 1}
                return item
            });

        },
        changePage: function () {
            this.viewActivities = !this.viewActivities;
        }
    },
    computed: {
        filteredActivities: function () {
            return this.sortActivities(
                this.searchActivities(this.activities),
                this.sortOrder
            );
        },
        /* The `disableAddToCart` function checked if an activity can be added to cart. It returns
        a function that takes an `id` parameter. */
        disableAddToCart: function () {
            return (id) => {
                const item = this.activities.find(item => item.id === id)
                if (item.spaces > 0) return false;
                return true
            }
        }
    }
})