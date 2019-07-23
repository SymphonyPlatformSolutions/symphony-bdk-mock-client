/* global SYMPHONY */

import React, { useState, useEffect, useRef } from 'react';
import WrapperMessageStack from '../../components/wrapper-message-stack';

const renderer = SYMPHONY.services.subscribe('extensionml-renderer');
let messagesCounter = 0;

const RendererApp = () => {
  const messagesEndRef = useRef();
  const [messages, changeMessages] = useState([]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const messageReceiver = (event) => {
    messagesCounter += 1;
    // For Chrome, the origin property is in the event.originalEvent object.
    if (typeof event.data === 'object' && event.data.call === 'sendValue') {
      const { template, entityJson, entityType } = event.data.value;
      let fullHtml;
      try {
        fullHtml = renderer.render(null, null, template.template, entityJson, ['presentationML', 'messageML']);
      } catch (e) {
        const errorMessage = `<messageML>
        <i>Something went wrong while trying to render the message</i><br />
        <p><i>Received template</i>:
        ${template}
        </p>
        <p><i>Caught error:</i><br />
        ${e}
        </p>
        </messageML>`;
        fullHtml = renderer.render(null, null, errorMessage, {}, ['presentationML', 'messageML']);
      }

      let htmlString = fullHtml.context.outerHTML;
      htmlString = htmlString.replace(
        'class="card collapsed has-body',
        `id="clickable_${messagesCounter}" class="card collapsed has-body" onclick="overrideCardCollapse('clickable_${messagesCounter}')"`,
      );

      const replaceableHeights = [...htmlString.matchAll(/<div[^>]*([^-]height:([^;|"|\n]*))(;|")/g)];
      replaceableHeights.forEach((el) => {
        htmlString = htmlString.replace(el[1], el[1].replace(el[2], `${el[2]} !important; overflow: unset;`));
      });

      changeMessages((prevState) => {
        messagesCounter += 1;
        return [...prevState, { htmlString, entityType }];
      });
      setTimeout(() => {
      }, 200);
    }
  };
  useEffect(() => {
    window.addEventListener('message', messageReceiver.bind(this), false);
  }, []);

  useEffect(scrollToBottom, [messages]);

  return (
    <div>
      {messages.map((el, index) => <WrapperMessageStack key={`wrapperMessageStack_${index}`} htmlContent={el.htmlString} entityType={el.entityType} />)}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default RendererApp;
