import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const Tiny = () => {
  const [content, setContent] = useState('');

  const handleEditorChange = (content, editor) => {
    setContent(content);
  };

  const handleSendContent = () => {
    // Aquí podrías enviar el contenido HTML a tu servidor
    // Para este ejemplo, simplemente lo mostraremos en un alert
    alert("Contenido HTML enviado:\n" + content);
  };

  return (
    <div>
      <Editor
        apiKey="ypxoh9xdlqcje7t1acradvy3x44k8kmvj1v1892jbct36xwa"
        initialValue="<p>Escribe aquí...</p>"
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar:
            'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        onEditorChange={handleEditorChange}
      />
      <button onClick={handleSendContent}>Enviar Contenido</button>
    </div>
  );
};

export default Tiny;