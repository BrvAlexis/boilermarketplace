import React from 'react';
import CookieConsent from "react-cookie-consent";
import Button from '@mui/material/Button';

function Cookie(){
return(
    <CookieConsent
        location="bottom"
        buttonText="I understand"
        cookieName="myAwesomeCookiChecker"
        style={{ background: "#2B373B", padding: "10px" }}
        buttonWrapperClasses="mui-button-wrapper"
        expires={150} //number as Day
        ButtonComponent={({ children, ...props }) => (
            <Button {...props} variant="contained" color="primary" size="small" style={{ fontSize: "13px" }}>
              {children}
            </Button>
          )}
    >
        This website uses cookies to enhance the user experience.{" "}
        <span style={{ fontSize: "10px" }}>We currently dont collect any data, So there is no Desagree button</span>
    </CookieConsent>
)
}
export default Cookie