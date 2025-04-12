import React from "react";
import Tree from "react-d3-tree";
import { useCenteredTree } from "./helpers";
import "./styles.css";

const containerStyles = {
  width: "90vw",
  height: "90vh",
  background: "#eee"
};

const renderCustomNode = ({ nodeDatum, toggleNode }) => {
  const childCount =
    (nodeDatum.children?.length || 0) + (nodeDatum._children?.length || 0);

  return (
    <g onClick={toggleNode} style={{ cursor: "pointer" }}>
      {/* Main Node Rect */}
      <rect
        width="180"
        height="80"
        x="-90"
        y="-40"
        fill="#AFDC8F"
        stroke="#2F80ED"
        strokeWidth={0}
        rx="10"
        ry="10"
      />

      {/* Node Name */}
      <text
        x="0"
        y="-10"
        textAnchor="middle"
        fontSize="13"
        fontWeight="300"
        fill="#333"
      >
        {nodeDatum.name}
      </text>

      {/* Child Count Rect (only if children exist) */}
      {childCount > 0 && (
        <>
          <rect
            width="40"
            height="20"
            x="-20"
            y="5"
            fill="#2F80ED"
            rx="5"
            ry="5"
          />
          <text
            x="0"
            y="19"
            textAnchor="middle"
            fontSize="12"
            fill="#fff"
            fontWeight="middle"
          >
            {childCount}
          </text>
        </>
      )}

      {/* Expand/Collapse Icon */}
      {nodeDatum.children && (
        <text
          x="0"
          y="45"
          textAnchor="middle"
          fontSize="14"
          fill="#2F80ED"
          fontWeight="600"
        >
          {nodeDatum.__rd3t.collapsed ? "➕" : "➖"}
        </text>
      )}

      {/* Node Attributes */}
      {/* {nodeDatum.attributes &&
        Object.entries(nodeDatum.attributes).map(([key, value], i) => (
          <text
            key={key}
            x="0"
            y={60 + i * 15}
            textAnchor="middle"
            fontSize="12"
            fill="#666"
          >
            {`${key}: ${value}`}
          </text>
        ))} */}
    </g>
  );
};




// Here we're using `renderCustomNodeElement` render a component that uses
// both SVG and HTML tags side-by-side.
// This is made possible by `foreignObject`, which wraps the HTML tags to
// allow for them to be injected into the SVG namespace.


export default function OrgChartTree({ data }) {
  const [translate, containerRef] = useCenteredTree(); // Auto-center tree

  // Reduce node size for better fit
  const nodeSize = { x: 250, y: 150 };

  // Adjust separation to avoid excessive spacing
  const separation = { siblings: 0.8, nonSiblings: 1.5 };

  return (
    <div style={containerStyles} ref={containerRef}>
      <Tree
        data={data}
        translate={translate}
        nodeSize={nodeSize}
        separation={separation}
        transitionDuration="1000"
        pathFunc="step"
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf"
        orientation="vertical"
        renderCustomNodeElement={renderCustomNode}
      />
    </div>
  );
}
