/*
 * Copyright 2017-2019 Allegro.pl
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { expect } from "chai";
import { mount, ReactWrapper, shallow } from "enzyme";
import * as React from "react";
import { SinonSpy, spy } from "sinon";
import { BubbleTitle } from "../bubble-title/bubble-title";
import { ModalBubble } from "../modal-bubble/modal-bubble";
import { HighlightModal } from "./highlight-modal";

describe("Highlight Modal", () => {
  it("should pass props correctly", () => {
    const title = "title";
    const left = 100;
    const top = 300;
    const modal = shallow(<HighlightModal
      title={title}
      left={left}
      top={top}
      clicker={null}>
      <div className="child">Child</div>
    </HighlightModal>);

    expect(modal.find(ModalBubble).prop("left")).to.eq(left);
    expect(modal.find(ModalBubble).prop("top")).to.eq(top);
    expect(modal.find(BubbleTitle).prop("title")).to.eq(title);
    expect(modal.find(".value").find(".child").length).to.eq(1);
  });

  describe("should wire clicker methods to actions", () => {
    let clicker: { acceptHighlight: SinonSpy, dropHighlight: SinonSpy };
    let actions: ReactWrapper<any, any>;
    let modal: ReactWrapper<any, any>;

    beforeEach(() => {
      const acceptHighlight = spy();
      const dropHighlight = spy();
      clicker = { acceptHighlight, dropHighlight };
      modal = mount(<HighlightModal title="title" left={0} top={0} clicker={clicker} />);
      actions = modal.find(".actions");
    });

    afterEach(() => {
      modal && modal.unmount();
    });

    it("should call acceptHighlight when clicking Accept", () => {
      const accept = actions.find(".accept").first();
      accept.simulate("click");

      expect(clicker.acceptHighlight.called).to.be.true;
      expect(clicker.dropHighlight.called).to.be.false;
    });
    it("should call acceptHighlight when clicking Drop", () => {
      const cancel = actions.find(".drop").first();
      cancel.simulate("click");

      expect(clicker.acceptHighlight.called).to.be.false;
      expect(clicker.dropHighlight.called).to.be.true;
    });
  });
});
