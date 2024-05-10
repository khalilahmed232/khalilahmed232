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
  "../accUtils",
  "text!../data/button_page.json",
  "text!../data/employee_data.json",
  "knockout",
  "ojs/ojarraydataprovider",
  "ojs/ojhtmlutils",
  "ojs/ojbinddom",
  "ojs/ojdialog",
  "ojs/ojformlayout",
  "ojs/ojinputtext",
  "ojs/ojtable",
  "ojs/ojlabel",
  "ojs/ojlabelvalue",
], function (
  accUtils,
  buttonPageData,
  empDataText,
  ko,
  ArrayDataProvider,
  HtmlUtils,
  binddom,
  formlayout,
  inputText,
  ojTable,
  ojLabel,
  ojLabelValue
) {
  function ButtonViewModel() {
    // Below are a set of the ViewModel methods invoked by the oj-module component.
    // Please reference the oj-module jsDoc for additional information.

    /**
     * Optional ViewModel method invoked after the View is inserted into the
     * document DOM.  The application can put logic that requires the DOM being
     * attached here.
     * This method might be called multiple times - after the View is created
     * and inserted into the DOM and after the View is reconnected
     * after being disconnected.
     */
    this.connected = () => {
      accUtils.announce("Customers page loaded.", "assertive");
      document.title = "Customers";

      this.htmlUtils = HtmlUtils;
      let buttonPageDataObj = JSON.parse(buttonPageData);
      let empData = JSON.parse(empDataText);

      this.employeeListADP = new ArrayDataProvider(empData.employees, {
        keyAttributes: "id",
      });

      this.clickListener1 = (event, data, bindingContext) => {
        $("#save-cancel-dialog")[0].open();
      };
      this.clickListener2 = (event, data, bindingContext) => {
        $("#save-cancel-dialog")[0].close();
      };
      this.clickListener3 = (event, data, bindingContext) => {
        $("#message-dialog")[0].open();
      };
      this.clickListener4 = (event, data, bindingContext) => {
        $("#message-dialog")[0].close();
      };

      require.config({ paths: { vs: "../js/libs/vs" } });
      let prevHeight = 0;

      require(["vs/editor/editor.main"], function () {
        let buttonDataItems = buttonPageDataObj.buttonDataItems;
        for (let i = 0; i < buttonDataItems.length; i++) {
          var sourceCodeEle = document.getElementById("source-code-div-" + i);

          var editor = monaco.editor.create(sourceCodeEle, {
            readOnly: true,
            domReadOnly: true,
            lineNumbers: false,
            language: "html",
            theme: "vs",
            fontSize: "16px",

            scrollBeyondLastLine: false,
            minimap: {
              enabled: false,
            },
            value: buttonDataItems[i].sourceCode,
            overviewRulerLanes: 0,
          });
          const editorElement = editor.getDomNode();

          const lineHeight = monaco.editor.EditorOption.lineHeight;
          let lineCount = editor.getModel()?.getLineCount() || 1;
          const height =
            editor.getTopForLineNumber(lineCount + 1) + lineHeight - 20;
          editorElement.style.height = `${height}px`;
          editor.layout();
        }
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
