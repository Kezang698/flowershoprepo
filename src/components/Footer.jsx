import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-light py-5">
      <div className="container">
        <div className="row">
          {/* Contact Information Column */}
          <div className="col-md-4">
            <h3>Contact Us</h3>
            <ul className="list-unstyled">
              <li><strong>Address:</strong> 123 Flower St, Blossom City</li>
              <li><strong>Email:</strong> info@flowershop.com</li>
              <li><strong>Phone:</strong> +123 456 7890</li>
            </ul>
          </div>

          {/* About Us Column */}
          <div className="col-md-4">
            <h3>About Us</h3>
            <p>
              Pain itself is important, and it is followed by great pain and
              suffering. But by the passage of time, one achieves labor and great
              pain!
            </p>
          </div>

          {/* Social Media Icons Column */}
          <div className="col-md-4">
            <h3>Follow Us</h3>
            <ul className="list-unstyled d-flex">
              <li>
                <Link href="#" className="btn btn-outline-secondary me-2">
                  <i className="fab fa-facebook-f"></i>
                </Link>
              </li>
              <li>
                <Link href="#" className="btn btn-outline-secondary me-2">
                  <i className="fab fa-instagram"></i>
                </Link>
              </li>
              <li>
                <Link href="#" className="btn btn-outline-secondary">
                  <i className="fab fa-twitter"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Credit */}
      <div className="text-center py-3 bg-dark text-white">
        <p>&copy; 2025 Flower Shop. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 