import React from "react";
import {FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

function Nav({libraryStatus, SETlibraryStatus}) {
  return (
    <nav>
      <h1>Aly3n Music Player</h1>
      <button className='library-toggle-btn' onClick={()=> SETlibraryStatus(!libraryStatus) }>
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
}

export default Nav;
