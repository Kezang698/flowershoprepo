import Link from 'next/link';

const HomeSection = () => {
  return (
    <section className="Home" id="Home">
      <div className="content">
        <h3>Fresh Flowers</h3>
        <span>Natural and beautiful Flowers</span>
        <p>
          Fresh and fragrant flowers for every occasion.
          Explore our collection now!
        </p>
        <Link href="#Products" className="btn">
          <i className="fa fa-shopping-cart"></i> Shop Now
        </Link>
      </div>
    </section>
  );
};

export default HomeSection; 