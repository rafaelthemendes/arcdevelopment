import * as routes from "./Routes";

export const routesOptions = {
  [routes.HOME]: { name: "Home", link: routes.HOME, activeIndex: 0 },
  [routes.SERVICES]: {
    name: "Services",
    link: routes.SERVICES,
    activeIndex: 1,
  },
  [routes.REVOLUTION]: {
    name: "The Revolution",
    link: routes.REVOLUTION,
    activeIndex: 2,
  },
  [routes.ABOUT]: { name: "About Us", link: routes.ABOUT, activeIndex: 3 },
  [routes.CONTACT]: {
    name: "Contact Us",
    link: routes.CONTACT,
    activeIndex: 4,
  },
  [routes.ESTIMATE]: {
    name: "Free Estimate",
    link: routes.ESTIMATE,
    activeIndex: 5,
  },
};

export const menuRoutesOptions = {
  [routes.SERVICES]: {
    name: "Services",
    link: routes.SERVICES,
    activeIndex: 0,
  },
  [routes.CUSTOM_SOFTWARE]: {
    name: "Custom Software Development",
    link: routes.CUSTOM_SOFTWARE,
    activeIndex: 1,
  },
  [routes.MOBILE_APPS]: {
    name: "iOS/Android App Development",
    link: routes.MOBILE_APPS,
    activeIndex: 2,
  },
  [routes.WEBSITES]: {
    name: "Website Development",
    link: routes.WEBSITES,
    activeIndex: 3,
  },
};

export const homeIndex = routesOptions[routes.HOME].activeIndex;
export const servicesIndex = routesOptions[routes.SERVICES].activeIndex;
export const servicesMenuIndex = menuRoutesOptions[routes.SERVICES].activeIndex;

export const routesOptionsValues = Object.values(routesOptions);
export const menuRoutesOptionsValues = Object.values(menuRoutesOptions);
