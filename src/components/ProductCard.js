import { Star, Link45deg } from 'react-bootstrap-icons'; // Using bootstrap icons instead

export default function ProductCard(props) {
  const { id, name, link, img, rating, rating_description, material } = props;

  // Convert rating to stars
  const ratingStars = Array.from({ length: 5 }, (_, i) => i < Math.round(rating));

  return (
    <div className="card shadow-sm h-100" style={{ maxWidth: '360px', transition: 'all 0.3s' }}>
      {/* Product Image */}
      <div className="position-relative overflow-hidden" style={{ height: '192px' }}>
        <img
          src={img || "/placeholder.svg"}
          alt={name}
          className="card-img-top h-100 object-fit-cover"
          style={{ transform: 'scale(1)', transition: 'transform 0.3s' }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
        <span className="badge bg-success position-absolute top-0 start-0 m-2">
          {id}
        </span>
      </div>

      {/* Product Details */}
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title mb-0" style={{ 
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {name}
          </h5>
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-decoration-none text-primary"
          >
            <Link45deg size={20} />
          </a>
        </div>

        {/* Material */}
        <p className="card-text text-muted mb-3">
          <strong>Material:</strong> {material}
        </p>

        {/* Rating */}
        <div className="d-flex align-items-center mb-2">
          <div className="d-flex me-2">
            {ratingStars.map((filled, index) => (
              <Star
                key={index}
                className={filled ? "text-warning" : "text-secondary"}
                style={{ marginRight: '2px' }}
              />
            ))}
          </div>
          <span className="text-muted">({rating}/5)</span>
        </div>
        
        <p className="card-text text-muted small fst-italic" style={{
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {rating_description}
        </p>
      </div>
    </div>
  );
}