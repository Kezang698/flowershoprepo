import Image from 'next/image';

const IconsContainer = () => {
  const icons = [
    {
      image: '/im1.jpeg',
      title: 'Free Delivery',
      description: 'On all orders'
    },
    {
      image: '/im2.jpg',
      title: '10 days returns',
      description: 'moneyback guarantee'
    },
    {
      image: '/im3.jpg',
      title: 'offer & gifts',
      description: 'On all orders'
    },
    {
      image: '/im4.jpeg',
      title: 'secure payments',
      description: 'protected by paypal'
    }
  ];

  return (
    <section className="icons-container">
      {icons.map((icon, index) => (
        <div className="icons" key={index}>
          <Image 
            src={icon.image} 
            alt={icon.title}
            width={100}
            height={100}
          />
          <div className="info">
            <h3>{icon.title}</h3>
            <span>{icon.description}</span>
          </div>
        </div>
      ))}
    </section>
  );
};

export default IconsContainer; 