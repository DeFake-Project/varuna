import OntologyContainer from "./ontology-container";

// load json files for nodes and edges
const filter = require("../../data/ontology-linear.json");
const ontology = require("../../data/ontology.json");

export default function Page() {
    return <>
        <header>
            Digital Multimedia Forensics Ontology
        </header>
        <main className="grid grid-cols-5 grid-auto-rows">
            <section className="instructions col-span-5">
                <h2>Use the interactable sentences provided to filter out the methods on the sidebar</h2>
                <p>all the fields have multi-select capability</p>
            </section>
            <section id="ontology" className="col-span-3">
                <OntologyContainer data={ontology} />
                {/*           
          <div id="why-block" className="flex">
            <div className="text-block">
              <h2>I think my content is a</h2>
            </div>
            <div className="option-block">
              <ul>
                <li>Deepfake</li>
                <li>Manual Forgery</li>
                <li>Out-of-context</li>
                <li></li>
              </ul>
            </div>
            <div className="text-block">
              <p>in the form of</p>
            </div>
            <div className="option-block">
              <ul>
                <li>video</li>
                <li>image</li>
                <li>audio</li>
                <li>text</li>
              </ul>
            </div>
            <div className="text-block">
              <p>in the</p>
            </div>
            <div className="option-block">
              <ul>
                <li>faceswap</li>
                <li>reenactment</li>
                <li>splicing</li>
                <li>copy-merge</li>
              </ul>
            </div>
            <div className="text-block">
              <p>category</p>
            </div>
          </div>
          <div id="where-block" className="flex">
            <div className="text-block">
              <h2>I want to analyze</h2>
            </div>
            <div className="option-block">
              <ul>
                <li>spatial</li>
                <li>temporal</li>
                <li>file</li>
              </ul>
            </div>
            <div className="text-block">
              <p>content in the form of</p>
            </div>
            <div className="option-block">
              <ul>
                <li>structural</li>
                <li>pixel-level</li>
                <li>context</li>
                <li>provenance</li>
                <li>identity</li>
                <li>etc1</li>
                <li>etc2</li>
                <li>etc3</li>
              </ul>
            </div>
          </div>
          <div id="what" className="flex">
            <div className="text-block">
              <h2>I want to search within</h2>
            </div>
            <div className="option-block">
              <ul>
                <li>human content</li>
                <li>non-human content</li>
                <li>scene</li>
                <li>file</li>
              </ul>
            </div>
            <div className="text-block">
              <p>restricted to</p>
            </div>
            <div className="option-block">
              <ul>
                <li>_</li>
                <li>biological</li>
                <li>non-biological</li>
              </ul>
            </div>
            <div className="option-block">
              <ul>
                <li>_</li>
                <li>face</li>
                <li>voice</li>
                <li>body</li>
                <li>text</li>
                <li>plants</li>
                <li>cars</li>
                <li>buildings</li>
              </ul>
            </div>

          </div> */}
            </section>
            <aside className="col-span-2">
                <h2>Showing methods that</h2>
                <ul>
                    <li>Detect instances of <span>Deepfakes for video reenactment</span></li>
                    <li>Search within <span>Human content restricted to faces</span></li>
                    <li>Analyze <span>spatial features</span> for <span>pixel inconsistency</span></li>
                </ul>
                <div>
                    <div>
                        <h3>EfficientNet_deepfake</h3>
                    </div>
                    <div>
                        <h3>XceptionNet_deepfake</h3>
                    </div>
                </div>
            </aside>
        </main>
    </>;
}