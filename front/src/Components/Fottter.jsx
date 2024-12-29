import React from 'react';
import './../App.css'; // Importing the CSS file

function Footer() {
    return (
        <div className="footer">
            <div className="footer-content">
                {/* Footer Links Section */}
                <div className="footer-links">
                    <a href="">About</a>
                    <a href="">Privacy Policy</a>
                    <a href="">Terms of Service</a>
                    <a href="/contact">Contact</a>
                </div>
            </div>

            {/* Copyright Text */}
            <p>&copy; {new Date().getFullYear()} Your Blog Website. All rights reserved. @venkat</p>
        </div>
    );
}

export default Footer;
