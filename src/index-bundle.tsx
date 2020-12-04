import React, { useState, useEffect, Fragment, JSXElementConstructor } from "react";
import ReactDOM from "react-dom";
import Iframe from "react-iframe";
import "./index.scss";

function ArticleBody(): any {
  return <Iframe url="http://127.0.0.1:8080/checkout.html"
        width="100%"
        height="800px"
        id="mutiplePaymentMethodsContainer" />;
}

function Paywall() {
      return (
        <Fragment>
      <div className="advertise rotate">
        <span>
          3 mån
          <br />
          endast 197 kr
          <br />
          Spara 1000 kr
        </span>
      </div>
      <div className="row column" style={{ paddingTop: "30px", paddingBottom: "20px" }}>
        <div className="small-1 medium-2 columns"></div>
        <div className="small-11 medium-10 columns">
          <div className="login-header">
            <div className="blank-space"> &nbsp;</div>
          </div>
        </div>
      </div>
      <div className="row column" style={{ border: "solid 1px #E2BDB7" }}>
        <div className="row">
          <div className="columns content-wrapper">
            <div className="offer-detail">
              <span>Full tillgång till di.se med nyheter och analyser</span>
            </div>
            <div className="offer-detail">
              <span>Tillgång till över 1100 aktiekurser i realtid</span>
            </div>
            <div className="offer-detail">
              <span>Dagens industri som e-tidning redan kvällen innan</span>
            </div>
            <div className="offer-detail">
              <span>Innehållet i alla Di:s appar, tjänster och nyhetsbrev</span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

exports = {
  React, ReactDOM, Paywall, ArticleBody
};
Object.keys(exports).forEach((d: any) => (window[d] = exports[d]));

const articleBodies = document.getElementsByClassName("article__body");
console.log("ArticleBodies", articleBodies);
if (!window["articleBodyRendered" as any] && articleBodies && articleBodies.length > 0) {
  console.log("ArticleBody");
  ReactDOM.render(<ArticleBody />, articleBodies[0]);
  window["articleBodyRendered" as any] = true as any;
}

const root = document.getElementById("root");
if (root) {
  console.log("Paywall");
  ReactDOM.render(<Paywall />, root);
}

// console.log(document.getElementById("serviceplusPaywall"));
