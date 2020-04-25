import React from 'react';
import './Footer.scss';
import Link from '../Link/Link';

const Footer = () => (
    <div className="Footer">
        <div className="Footer-Navigation">
            <Link name="Support"
                  href="#"
                  mixedClassNames="Footer-Link_space_right"
            />
            <Link name="Learning" href="#" />
        </div>
        <div className="Footer-Copyright">
            © 2020 Stepanov Yuriy
        </div>
    </div>
);

export default Footer;
