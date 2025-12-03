const TailwindWrapper = ({ children }) => {
  return (
    <div className="tailwind-scope" style={{ all: "initial" }}>
      <div style={{ all: "unset" }}>{children}</div>
    </div>
  );
};

export default TailwindWrapper;
