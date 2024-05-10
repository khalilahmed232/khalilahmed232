/**
 * @license
 * Copyright (c) 2014, 2022, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your application specific code will go here
 */
define([
  "knockout",
  "ojs/ojcontext",
  "ojs/ojmodule-element-utils",
  "ojs/ojknockouttemplateutils",
  "ojs/ojcorerouter",
  "ojs/ojmodulerouter-adapter",
  "ojs/ojknockoutrouteradapter",
  "ojs/ojurlparamadapter",
  "ojs/ojresponsiveutils",
  "ojs/ojresponsiveknockoututils",
  "ojs/ojarraydataprovider",
  "ojs/ojdrawerpopup",
  "ojs/ojmodule-element",
  "ojs/ojknockout",
], function (
  ko,
  Context,
  moduleUtils,
  KnockoutTemplateUtils,
  CoreRouter,
  ModuleRouterAdapter,
  KnockoutRouterAdapter,
  UrlParamAdapter,
  ResponsiveUtils,
  ResponsiveKnockoutUtils,
  ArrayDataProvider
) {
  function ControllerViewModel() {
    this.KnockoutTemplateUtils = KnockoutTemplateUtils;

    // Handle announcements sent when pages change, for Accessibility.
    this.manner = ko.observable("polite");
    this.message = ko.observable();
    announcementHandler = (event) => {
      this.message(event.detail.message);
      this.manner(event.detail.manner);
    };

    document
      .getElementById("globalBody")
      .addEventListener("announce", announcementHandler, false);

    // Media queries for repsonsive layouts
    const smQuery = ResponsiveUtils.getFrameworkQuery(
      ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY
    );
    this.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
    const mdQuery = ResponsiveUtils.getFrameworkQuery(
      ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP
    );
    this.mdScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

    let navData = [
      { path: "", redirect: "button" },
      {
        path: "button",
        detail: { label: "Button Sample", iconClass: "" },
      },
      {
        path: "loading-dialog",
        detail: { label: "loading-dialog", iconClass: "" },
      },
      {
        path: "thick-scrollbar",
        detail: { label: "thick-scroll-bar", iconClass: "" },
      },
      {
        path: "list-image-items",
        detail: { label: "list-image-items", iconClass: "" },
      },
      {
        path: "cwc-2023",
        detail: { label: "cwc-2023", iconClass: "" },
      },
      {
        path: "number-format-sample",
        detail: { label: "number-format-sample", iconClass: "" },
      },
      {
        path: "date-format-sample",
        detail: { label: "date-format-sample", iconClass: "" },
      },
      {
        path: "collections-view-option",
        detail: { label: "collections-view-option", iconClass: "" },
      },
      {
        path: "table-long-text",
        detail: { label: "table-long-text", iconClass: "" },
      },
      {
        path: "data-grid-example",
        detail: { label: "data-grid-example", iconClass: "" },
      },
      {
        path: "blog-list",
        detail: { label: "blog-list", iconClass: "" },
      },
      {
        path: "file-picker",
        detail: { label: "file-picker", iconClass: "" },
      },
    ];

    // Router setup
    let router = new CoreRouter(navData, {
      urlAdapter: new UrlParamAdapter(),
    });
    router.sync();

    this.moduleAdapter = new ModuleRouterAdapter(router);

    this.selection = new KnockoutRouterAdapter(router);

    // Setup the navDataProvider with the routes, excluding the first redirected
    // route.
    this.navDataProvider = new ArrayDataProvider(navData.slice(1), {
      keyAttributes: "path",
    });

    // Drawer
    self.sideDrawerOn = ko.observable(false);

    // Close drawer on medium and larger screens
    this.mdScreen.subscribe(() => {
      self.sideDrawerOn(false);
    });

    // Called by navigation drawer toggle button and after selection of nav drawer item
    this.toggleDrawer = () => {
      self.sideDrawerOn(!self.sideDrawerOn());
    };

    // Header
    // Application Name used in Branding Area
    this.appName = ko.observable("khalil232");
    // User Info used in Global Navigation area
    this.userLogin = ko.observable("john.hancock@oracle.com");

    // Footer
    this.footerLinks = [
      {
        name: "About",
        linkId: "aboutMe",
        linkTarget: "https://khalil232.com/about/",
      },
    ];
  }
  // release the application bootstrap busy state
  Context.getPageContext().getBusyContext().applicationBootstrapComplete();

  return new ControllerViewModel();
});
