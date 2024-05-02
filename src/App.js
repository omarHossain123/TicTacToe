// defining a function called square, "export" keyword in JavaScript makes it accessible outside of 
// this file. The default keyword tells other files using the code that it’s the main function in the file.
export default function Square() { 
  /*
  The second line returns a button. <button> is a JSX element. A JSX element is a  combination of 
  JavaScript code and HTML tags that describes what you’d like to display. className="square" is a button
  property or prop that tells CSS ( a computer language for laying out and structuring web pages, HTML 
  or XML) how to style the button. X is the text  displayed inside of the button and </button> closes the
  JSX element to indicate that any following content shouldn’t be placed inside the button.
  */
  return (
  <>
    <button className="square">bob</button> 
    <button className="square">X</button> 
  </>
  );
}
