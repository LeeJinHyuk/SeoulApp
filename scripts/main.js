/**
 * Created by LeeJinHyuk on 2016-07-31.
 */
"use strict";
import React from "react";
import ReactDom from "react-dom";
import Container from "./view/container";

window.onload = function() {
  ReactDom.render(<Container />, document.getElementById("root"));
};
