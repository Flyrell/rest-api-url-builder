import RouteBuilder from './route-builder';
import { RawRouteMap, UrlBuilderOptions } from './models';

const defaultOptions: UrlBuilderOptions = {
    baseURL: ''
};

function mergeConfig (options1: UrlBuilderOptions, options2: UrlBuilderOptions): UrlBuilderOptions {
    const config: UrlBuilderOptions = [];

    for (const optionName in options1) {
        config[optionName] = options1[optionName];
    }

    for (const optionName in options2) {
        config[optionName] = options2[optionName];
    }

    return config;
}

class UrlBuilder {

    routes: RawRouteMap;
    options: UrlBuilderOptions;

    constructor (routes: RawRouteMap, options: UrlBuilderOptions = {}) {
        this.routes = routes;
        this.options = mergeConfig(defaultOptions, options);
    }

    build (routeName: string): RouteBuilder {
        if (!this.routes.hasOwnProperty(routeName)) {
            throw new Error(`Route ${routeName} not found`);
        }

        let route = this.routes[routeName];
        if (typeof route === 'string') {
            route = { path: route };
        }

        const baseURL = route.baseURL ? route.baseURL : this.options.baseURL;
        return new RouteBuilder(routeName, route.path, baseURL);
    }
}

export default UrlBuilder;
