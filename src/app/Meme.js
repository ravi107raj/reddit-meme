import { ClientContext } from 'graphql-hooks';
import { useClient } from 'graphql-hooks';

function MyComponent() {
  const client = useClient();

  // ...
}

function MemesGallery() {
  const [memes, setMemes] = useState([]);
  const [after, setAfter] = useState(null);

  // Use useClient to mark this component as a Client Component
  useClient();

  useEffect(() => {
    axios.get(MEMES_URL, { params: { after } })
      .then((response) => {
        const newMemes = response.data.data.children.map((child) => {
          const { url, thumbnail } = child.data;
          return {
            src: url,
            thumbnail,
            width: 1,
            height: 1,
          };
        });
        setMemes((prevMemes) => [...prevMemes, ...newMemes]);
        setAfter(response.data.data.after);
      });
  }, [after]);

  const handleGalleryClick = (event, { index }) => {
    event.preventDefault();
    // You can implement the gallery opening logic here if needed
    console.log('Opening gallery for index:', index);
  };

  return (
    <ClientContext.Provider value={client}>
      <Gallery
        photos={memes}
        onClick={handleGalleryClick}
      />
    </ClientContext.Provider>
  );
}

export default MemesGallery;
