import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebook,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faBriefcase } from "@fortawesome/free-solid-svg-icons";

/**
 * Footer
 * ------
 * Official government-style footer
 */
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        
        {/* App Info */}
        <div>
          <h3 className="text-white font-semibold mb-2">
            Civic Connect
          </h3>
          <p>
           An initiative for transparent & efficient public service grievance management.
          </p>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-white font-semibold mb-2">
            Contact Us
          </h3>
          <p className="flex items-center gap-2">
            <FontAwesomeIcon icon={faEnvelope} />
            support@civicconnect.gov.in
          </p>
          <p>Phone: +91 98765 43210</p>
          <p>Mon–Fri, 9 AM – 6 PM</p>
        </div>

        {/* Careers */}
        <div>
          <h3 className="text-white font-semibold mb-2">
            Careers
          </h3>
          <p className="flex items-center gap-2">
            <FontAwesomeIcon icon={faBriefcase} />
            <a
              href="#"
              className="text-blue-400 hover:underline"
            >
              View Open Positions
            </a>
          </p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-white font-semibold mb-2">
            Follow Us
          </h3>

          <div className="flex gap-4 text-lg mt-2">
            <a href="#" className="hover:text-white">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#" className="hover:text-white">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="#" className="hover:text-white">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="#" className="hover:text-white">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4 text-center text-xs">
        © {new Date().getFullYear()} Civic Connect | All rights reserved.
      </div>
    </footer>
  );
}
