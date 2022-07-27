import {makeObservable, observable, action, runInAction} from "mobx"

type UserState = {
    loading: boolean,
    data: Record<string, string | null>,
    error: string | null
}
type ProductsState = {
    loading: boolean,
    data: any[],
    error: string | null
}
type CategoriesState = {
    loading: boolean,
    categories: string[],
    error: string | null
}
type cartDataState = {
    loading: boolean,
    carts: any,
    error: string | null
}
type cartUpdatesStatus = {
    msg: string
}


export class StoreImpl {

    userData: UserState = {
        loading: false,
        data: {},
        error: ''
    }
    products: ProductsState = {
        loading: false,
        data: [],
        error: ''
    }
    allCategories: CategoriesState = {
        loading: false,
        categories: [],
        error: ''
    }
    cartData: cartDataState = {
        loading: false,
        carts: [],
        error: ''
    }
    productByCategory: ProductsState = {
        loading: false,
        data: [],
        error: ''
    }
    cartUpdates: cartUpdatesStatus = {
        msg: ''
    }
    toastStatus: boolean = false;
    idsToExclude: any = []
    allProductsFromDatabase: ProductsState = {
        loading: false,
        data: [],
        error: ''
    }

    constructor() {
        makeObservable(this, {
            userData: observable,
            products: observable,
            allCategories: observable,
            cartData: observable,
            toastStatus: observable,
            productByCategory: observable,
            cartUpdates: observable,
            idsToExclude: observable,
            allProductsFromDatabase: observable,
            toastOpening: action,
            updateCart: action,
            getDisplayedProducts: action,
            addProductsToCart: action,
            deleteItemFromCart: action,
            getCategoriesData: action,
            getProductsData: action,
            searchProducts: action,
            getUserData: action,
            getCartData: action
        }, {autoBind: true})
    }

    async getUserData() {
        try {
            const response = await fetch('https://dummyjson.com/users/1');

            if (response.status >= 300)
                throw new Error(response.statusText);

            const data = await response.json();
            runInAction(() =>
                this.userData = {loading: false, data, error: ''}
            )
            // return this.userData;

        } catch (e: any) {
            this.userData = {loading: false, data: {}, error: e};
        }
    }

    async getProductsData() {
        try {
            const response = await fetch('https://dummyjson.com/products?limit=60');

            if (response.status >= 300)
                throw new Error(response.statusText);

            const {products} = await response.json();
            runInAction(() =>
                (this.products = {loading: false, data: products, error: ''},
                    this.allProductsFromDatabase = {loading: false, data: products, error: ''},
                    this.getCartData())
            )

        } catch (e: any) {
            this.products = {loading: false, data: [], error: e};
        }
    }

    async getCartData() {
        try {
            const response = await fetch('https://dummyjson.com/carts/user/5');

            if (response.status >= 300)
                throw new Error(response.statusText);

            const {carts} = await response.json();
            runInAction(() => (
                this.cartData = {loading: false, carts: carts, error: ''},
                    this.idsToExclude = carts[0]?.products.map((product: any) => product.id),
                    this.products.data = this.products.data.filter((product) => (
                        this.idsToExclude?.indexOf(product.id) === -1
                    ))


            ))

        } catch (e: any) {
            this.cartData = {loading: false, carts: [], error: e};
        }
    }

    async getCategoriesData() {
        try {
            const response = await fetch('https://dummyjson.com/products/categories');

            if (response.status >= 300)
                throw new Error(response.statusText);

            const data = await response.json();
            runInAction(() =>
                this.allCategories = {loading: false, categories: data, error: ''}
            )

        } catch (e: any) {
            this.allCategories = {loading: false, categories: [], error: e};
        }
    }

    async getProductsFromSelectedCategory(category: string) {
        try {
            const response = await fetch(`https://dummyjson.com/products/category/${category}`);

            if (response.status >= 300)
                throw new Error(response.statusText);

            const {products} = await response.json();
            runInAction(() => this.products = {loading: false, data: products, error: ''})

        } catch (e: any) {
            this.products = {loading: false, data: [], error: e};
        }
    }

    async addProductsToCart(product: any) {
        try {
            const response = await fetch('https://dummyjson.com/carts/1', {
                method: 'PUT', /* or PATCH */
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    products: [
                        {
                            id: product.id,
                            quantity: product.quantity,
                        },
                    ]
                })
            });

            if (response.status >= 300)
                throw new Error(response.statusText);

            const res = await response.json();
            this.cartUpdates.msg = `The Item ${res.products[0].id} was added to cart`
            this.toastOpening();

        } catch (e: any) {
            this.cartUpdates.msg = `The Item was not added`;
            this.toastOpening();
        }
    }

    async searchProducts(queryParam: string) {
        try {
            const response = await fetch(`https://dummyjson.com/products/search?q=${queryParam}`);

            if (response.status >= 300)
                throw new Error(response.statusText);

            const {products} = await response.json();
            runInAction(() => this.products = {loading: false, data: products, error: ''})

        } catch (e: any) {
            this.products = {loading: false, data: [], error: e};
        }
    }

    getDisplayedProducts() {
        this.getProductsData();
    }

    deleteItemFromCart(id: number) {
        this.cartData.carts[0].products = this.cartData.carts[0].products.filter((product: any) => product.id !== id)
        let productRemoved = this.allProductsFromDatabase.data.filter((product: any) =>
            product.id === id
        )
        this.products.data.push(productRemoved[0])
    }

    toastOpening() {
        this.toastStatus = !this.toastStatus
        return setTimeout(() => {
            this.toastStatus = !this.toastStatus
        }, 3000)
    }

    updateCart(id: number) {
        this.products.data = this.products.data.filter((product: any) => product.id !== id)
    }
}

export const Store = new StoreImpl();
