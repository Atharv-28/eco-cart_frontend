import { StarFill, Star, Link45deg } from 'react-bootstrap-icons'; 
import badge from "../assets/eco-badge.png"; 

export default function ProductCard(props) {
  const { id, name, link, img, rating, rating_description, material } = props;

  const ratingStars = Array.from({ length: 5 }, (_, i) => i < Math.round(rating));

  return (
    <div className="card shadow-sm h-100" style={{ maxWidth: '360px', transition: 'all 0.3s' }}>
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

        {/* Image overlay for rating >= 3 */}
        {rating >= 3 && (
          <img
            src={badge} // Replace with the path to your badge image
            alt="Eco-Friendly Badge"
            className="position-absolute top-0 end-0 m-2"
            style={{ width: '50px', height: '50px' }} // Adjust size as needed
          />
        )}
      </div>

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

        <p className="card-text text-muted mb-3">
          <strong>Material:</strong> {material}
        </p>

        <div className="d-flex align-items-center mb-2">
          <div className="d-flex me-2">
            {ratingStars.map((filled, index) => (
              filled ? (
                <StarFill
                  key={index}
                  className="text-success" // for green color
                  style={{ marginRight: '2px' }}
                />
              ) : (
                <Star
                  key={index}
                  className="text-success" 
                  style={{ marginRight: '2px' }}
                />
              )
            ))}
          </div>
          <span className="text-muted">({rating})</span>
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