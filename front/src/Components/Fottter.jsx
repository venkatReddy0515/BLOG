import React from 'react';
import './../App.css'; // Importing the CSS file

function Footer() {
    return (
        <div className="footer">
            <div className="footer-content">
                {/* Footer Links Section */}
                <div className="footer-links">
                    <a href="/about">About</a>
                    <a href="/privacy-policy">Privacy Policy</a>
                    <a href="/terms-of-service">Terms of Service</a>
                    <a href="/contact">Contact</a>
                </div>
            </div>

            {/* Copyright Text */}
            <p>&copy; {new Date().getFullYear()} Your Blog Website. All rights reserved. @venkat</p>
        </div>
    );
}

export default Footer;
