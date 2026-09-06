import ShapeGrid from '../ShapeGrid';

const Background = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <ShapeGrid
        speed={0}
        squareSize={40}
        direction="diagonal"
        borderColor="var(--grid-color)"
        lightBorderWidth={0.1}
        darkBorderWidth={1}
        hoverFillColor="var(--grid-hover)"
        shape="square"
        hoverTrailAmount={0}
      />
    </div>
  );
};

export default Background;