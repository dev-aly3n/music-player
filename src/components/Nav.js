import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

function Nav({ libraryStatus, SETlibraryStatus }) {
  ////jsx
  return (
    <nav>
      <h1>Aly3n Music Player</h1>
      {/* if clicked just set the library status to the opposite of the library status to expand and close the library */}
      <button
        className="library-toggle-btn"
        onClick={() => SETlibraryStatus(!libraryStatus)}
      >
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
}

export default Nav;
