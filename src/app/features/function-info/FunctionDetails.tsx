import React from "react";
import styled from "styled-components";
import { Fieldset } from "react95";

const Container = styled(Fieldset)`
  width: 300px;
  min-width: 300px;
  flex-shrink: 0;
  margin-left: 16px;
  margin-top: 20px;
  position: relative;
`;

const Content = styled.div`
  position: absolute;
  top: 16px;
  left: 12px;
  right: 16px;
  bottom: 12px;
  overflow: auto;
  overflow-x: hidden;
`;

const DataItem = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 6px;
`;

const ParamItem = styled.code`
  font-size: 12px;
  font-family: monospace;
  margin-left: 12px;
  display: block;
`;

const FloatRight = styled.span`
  float: right;
`;

const Name = styled.span`
  max-width: 210px;
  overflow: hidden;
  text-overflow: ellipsis;
  float: right;
`;

const FunctionInfo = ({ fn }) => {
  if (!fn) {
    return (
      <Container label="Function info">
        <div>Please select a function.</div>
      </Container>
    );
  }
  console.log(fn.outputs);
  return (
    <Container label="Function info">
      <Content>
        <DataItem>
          <b>Name:</b>{" "}
          <Name className="function-details-name" title={fn.name}>
            {fn.name}
          </Name>
        </DataItem>

        <DataItem>
          <b>State Mutability:</b>{" "}
          <FloatRight className="function-details-state-mutability">
            {fn?.stateMutability?.toString()}
          </FloatRight>
        </DataItem>

        {fn.inputs?.length > 0 && (
          <>
            <div>
              <b>Inputs:</b>
            </div>
            {fn.inputs.map((input, i) => (
              <ParamItem key={input.name}>
                [{i}]<i>{input.type}</i> {input.name}
              </ParamItem>
            ))}
          </>
        )}

        {fn.outputs?.length > 0 && (
          <>
            <div>
              <b>Outputs:</b>
            </div>
            {fn.outputs.map((output, i) => {
              if (output.type === "tuple") {
                console.log(output.components);
                return (
                  <>
                    <ParamItem key={output.name}>
                      [{i}]<i>{output.type}</i> {output.internalType}
                    </ParamItem>
                    {output?.components?.map((comp, j) => {
                      return (
                        <ParamItem
                          key={comp.name}
                          style={{ marginLeft: "36px" }}
                        >
                          [{j}]<i>{comp.type}</i> {comp.name}
                        </ParamItem>
                      );
                    })}
                  </>
                );
              } else {
                return (
                  <ParamItem key={output.name}>
                    [{i}]<i>{output.type}</i> {output.name}
                  </ParamItem>
                );
              }
            })}
          </>
        )}
      </Content>
    </Container>
  );
};

export default FunctionInfo;
