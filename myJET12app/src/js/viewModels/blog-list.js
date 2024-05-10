/**
 * @license
 * Copyright (c) 2014, 2022, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your customer ViewModel code goes here
 */

define([
  "text!../data/blog-list-data.json",
  "knockout",
  "ojs/ojarraydataprovider",
  "ojs/ojtable",
  "ojs/ojbinddom",
  "ojs/ojhtmlutils",
], function (
  blogListDataJSON,
  ko,
  ArrayDataProvider,
  ojtable,
  ojbinddom,
  HtmlUtils
) {
  function ButtonViewModel() {
    this.connected = () => {
      if (window.self !== window.top) {
        $(".oj-web-applayout-header").hide();
        $(".oj-web-applayout-footer").hide();
      }

      let blogListData = JSON.parse(blogListDataJSON);
      // console.log(empData);

      this.getConfigForDOM = function (htmlContent) {
        return {
          view: HtmlUtils.stringToNodeArray(htmlContent),
          data: {},
        };
      };

      this.employeeListADP = new ArrayDataProvider(blogListData.blogs, {
        keyAttributes: "id",
      });
    };

    /**
     * Optional ViewModel method invoked after the View is disconnected from the DOM.
     */
    this.disconnected = () => {
      // Implement if needed
    };

    /**
     * Optional ViewModel method invoked after transition to the new View is complete.
     * That includes any possible animation between the old and the new View.
     */
    this.transitionCompleted = () => {
      // Implement if needed
    };
  }

  /*
   * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
   * return a constructor for the ViewModel so that the ViewModel is constructed
   * each time the view is displayed.
   */
  return ButtonViewModel;
});
