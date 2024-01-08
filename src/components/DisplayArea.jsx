/* eslint-disable react/prop-types */

export const giveThread = ({ thread }) => {
  return console.log(thread);
};

export const DisplayArea = ({ textArray }) => {
  return (
    <div className="chat-container">
      {textArray.map((element, index) => (
        <p key={index} classsName="text-box">
          {element}
          <br />
        </p>
      ))}
    </div>
  );
};
