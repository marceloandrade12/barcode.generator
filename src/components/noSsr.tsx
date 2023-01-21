import dynamic from "next/dynamic";
import React from "react";

// component to disable server side render
// for example when we need to use local storage

const NoSsr = (props: { children: React.ReactNode }) => (
  <React.Fragment>{props.children}</React.Fragment>
);

export default dynamic(() => Promise.resolve(NoSsr), {
  ssr: false,
});
