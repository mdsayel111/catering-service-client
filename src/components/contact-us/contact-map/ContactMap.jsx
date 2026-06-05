// Information component for displaying contact details
const ContactMap = () => {
  return (
    <div className="w-full h-full">
      <iframe
        src={`https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d912.8042191554086!2d90.35736502848141!3d23.775290225950545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjPCsDQ2JzMxLjAiTiA5MMKwMjEnMjguOCJF!5e0!3m2!1sen!2sbd!4v1763564454919!5m2!1sen!2sbd`}
        className="w-full h-full !border-0 !border-none" // h-96 = 384px
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default ContactMap;

<iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d912.8042191554086!2d90.35736502848141!3d23.775290225950545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjPCsDQ2JzMxLjAiTiA5MMKwMjEnMjguOCJF!5e0!3m2!1sen!2sbd!4v1763564454919!5m2!1sen!2sbd" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>