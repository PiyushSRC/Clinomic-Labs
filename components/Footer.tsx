import React from 'react';

const Footer: React.FC = () => {
    return (
        <div className="mt-8 md:mt-12 pt-4 md:pt-6 border-t border-white/10 flex flex-col items-center justify-center gap-4 px-6 md:px-12 lg:px-24 pb-0">
            {/* Text and Links (Center) */}
            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-small-label uppercase tracking-widest font-medium text-white/50 font-heading">
                <span>&copy; 2026 Arogya BioX. All rights reserved.</span>

                {[
                    { name: 'Privacy Policy', href: '/privacy-policy.html' },
                    { name: 'Terms & Conditions', href: '/terms-conditions.html' },
                    { name: 'Medical Disclaimer', href: '/disclaimer.html' },
                    { name: 'DPDP Act', href: '/dpdp-act.html' }
                ].map((link) => (
                    <React.Fragment key={link.name}>
                        <span className="hidden md:inline text-white/20">|</span>
                        <a href={link.href} className="hover:text-blue-300 transition-colors uppercase">
                            {link.name}
                        </a>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default Footer;
