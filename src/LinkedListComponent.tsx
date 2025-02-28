import React, { useState } from 'react';

// Define the Song Node structure for the Doubly Linked List
class SongNode {
  title: string;
  artist: string;
  next: SongNode | null = null;
  prev: SongNode | null = null;

  constructor(title: string, artist: string) {
    this.title = title;
    this.artist = artist;
  }
}

// Define the Playlist class (Doubly Linked List)
class Playlist {
  head: SongNode | null = null;
  tail: SongNode | null = null;

  // Method to add a song to the playlist
  addSong(title: string, artist: string): void {
    const newSong = new SongNode(title, artist);

    if (this.tail === null) {
      this.head = this.tail = newSong;
      return;
    }

    this.tail.next = newSong;
    newSong.prev = this.tail;
    this.tail = newSong;
  }

  // Method to delete a song from the playlist
  deleteSong(title: string): void {
    let current = this.head;

    while (current !== null) {
      if (current.title === title) {
        if (current.prev) {
          current.prev.next = current.next;
        } else {
          this.head = current.next; // If it's the head song
        }

        if (current.next) {
          current.next.prev = current.prev;
        } else {
          this.tail = current.prev; // If it's the tail song
        }
        return;
      }
      current = current.next;
    }
  }

  // Method to get the next song
  getNextSong(current: SongNode | null): SongNode | null {
    return current ? current.next : null;
  }

  // Method to get the previous song
  getPrevSong(current: SongNode | null): SongNode | null {
    return current ? current.prev : null;
  }

  // Method to get all songs as an array for display
  getSongs(): string[] {
    let current = this.head;
    let songs: string[] = [];
    while (current !== null) {
      songs.push(`${current.title} by ${current.artist}`);
      current = current.next;
    }
    return songs;
  }

  // Method to get the first song in the playlist
  getFirstSong(): SongNode | null {
    return this.head;
  }
}

const PlaylistComponent: React.FC = () => {
  const [songTitle, setSongTitle] = useState<string>('');
  const [songArtist, setSongArtist] = useState<string>('');
  const [playlist] = useState<Playlist>(new Playlist());
  const [displaySongs, setDisplaySongs] = useState<string[]>([]);
  const [currentSong, setCurrentSong] = useState<SongNode | null>(null);

  const handleAddSong = () => {
    if (songTitle && songArtist) {
      playlist.addSong(songTitle, songArtist);
      setDisplaySongs(playlist.getSongs());
      setSongTitle('');
      setSongArtist('');
    }
  };

  const handleDeleteSong = (song: string) => {
    playlist.deleteSong(song);
    setDisplaySongs(playlist.getSongs());
    if (currentSong && song === `${currentSong.title} by ${currentSong.artist}`) {
      setCurrentSong(null); // Reset current song if it's deleted
    }
  };

  const handleNext = () => {
    if (currentSong) {
      const nextSong = playlist.getNextSong(currentSong);
      setCurrentSong(nextSong);
    } else {
      setCurrentSong(playlist.getFirstSong()); // Start at the first song if none is selected
    }
  };

  const handlePrevious = () => {
    if (currentSong) {
      const prevSong = playlist.getPrevSong(currentSong);
      setCurrentSong(prevSong);
    }
  };

  return (
    <div>
      <h1>Playlist Navigation</h1>

      <div>
        <input
          type="text"
          placeholder="Song Title"
          value={songTitle}
          onChange={(e) => setSongTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Artist Name"
          value={songArtist}
          onChange={(e) => setSongArtist(e.target.value)}
        />
        <button onClick={handleAddSong}>Add Song</button>
      </div>

      <h3>Current Playlist</h3>
      <ul>
        {displaySongs.map((song, index) => (
          <li key={index}>
            {song}{' '}
            <button onClick={() => handleDeleteSong(song)}>Delete</button>
          </li>
        ))}
      </ul>

      <div>
        <h3>Now Playing: {currentSong ? `${currentSong.title} by ${currentSong.artist}` : 'No song selected'}</h3>
        <button onClick={handlePrevious} disabled={!currentSong || !currentSong.prev}>
          Previous
        </button>
        <button onClick={handleNext} disabled={!currentSong || !currentSong.next}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PlaylistComponent;
