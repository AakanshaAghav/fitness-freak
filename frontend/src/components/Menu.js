import { Link } from 'react-router-dom';

function Menu() {
  return (
    <nav>
      <ul>
        {menuItems.map(({ name, icon, path, externalPath }) => (
          <li key={name} className="menu-item">
            {externalPath ? (
              <a href={externalPath} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                {icon} {name}
              </a>
            ) : path ? (
              <Link to={path} className="flex items-center gap-2">
                {icon} {name}
              </Link>
            ) : (
              <span className="flex items-center gap-2 cursor-default">
                {icon} {name}
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
