import { Button, Flex, Image, List, useBreakpointValue, Text } from "@chakra-ui/react";
import Logo from "@/assets/logo.svg";
import { Link, NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaWhatsapp, FaPhone } from "react-icons/fa";

// GetInTouchModal Component Definition
const GetInTouchModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const accentColor = "#EF7826";
  const modalBgColor = "#181818"; // Slightly lighter than navbar's deep dark for layering
  const textColor = "#EAEAEA";

  // Actual phone number and WhatsApp link
  const phoneNumber = "+2349120245727"; 
  const whatsappLink = "https://wa.me/2349120245727";
  const callLink = `tel:${phoneNumber.replace(/\s/g, '')}`; // Ensure no spaces in tel link

  return (
    <div // Backdrop
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1050, // Higher than navbar
      }}
      onClick={onClose} // Close on backdrop click
    >
      <div // Modal Content
        style={{
          background: modalBgColor,
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
          minWidth: '320px',
          maxWidth: '90%',
          position: 'relative',
          zIndex: 1051,
          textAlign: 'center',
          border: `1px solid ${accentColor}`
        }}
        onClick={(e) => e.stopPropagation()} // Prevent backdrop click when clicking content
      >
        <button
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'transparent',
            border: 'none',
            color: textColor,
            fontSize: '24px',
            cursor: 'pointer',
          }}
          onClick={onClose}
        >
          &times;
        </button>
        <Text fontSize="2xl" fontWeight="bold" color={textColor} mb={6}>
          Get in Touch
        </Text>

        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          <Button
            style={{
              background: '#25D366', // WhatsApp green
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              width: '100%',
              marginBottom: '15px',
              transition: 'background-color 0.2s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#1DAA50'}
            onMouseOut={(e) => e.currentTarget.style.background = '#25D366'}
          >
            <FaWhatsapp size={20} />
            Chat on WhatsApp
          </Button>
        </a>

        <a href={callLink} style={{ textDecoration: 'none' }}>
          <Button
            style={{
              background: accentColor,
              color: modalBgColor, // Dark text on accent
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              width: '100%',
              transition: 'background-color 0.2s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#D66A1F'}
            onMouseOut={(e) => e.currentTarget.style.background = accentColor}
          >
            <FaPhone size={20} />
            Call Us Directly
          </Button>
        </a>
      </div>
    </div>
  );
};

// Custom hook to track scroll position
const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset);
    };
    window.addEventListener("scroll", updatePosition);
    updatePosition(); // Initial call
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return scrollPosition;
};

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const scrollPosition = useScrollPosition(); // Get scroll position

  const toggleActive = () => {
    setActive(!active);
  };

  const menu = [
    { name: "Home", hrefLink: "/" },
    { name: "About Us", hrefLink: "/about" },
    { name: "Our Services", hrefLink: "/services" },
    { name: "Recent Projects", hrefLink: "/projects" },
  ];

  // Determine background based on scroll position
  const navBg = scrollPosition > 50 ? "#121212" : "transparent"; // Transparent when at top
  const navTextColor = "#EAEAEA"; // Light text for dark background
  const accentColor = "#EF7826"; // Existing accent color

  return (
    <Flex
      as="nav"
      w="100%"
      h="80px"
      position="fixed"
      top={0}
      left={0}
      alignItems="center"
      px={{ base: 4, md: 6, lg: 8 }} // Increased padding slightly
      py={{ base: 3, md: 4 }}
      bg={navBg} // Dynamic background
      fontFamily="'Poppins', sans-serif"
      boxShadow={scrollPosition > 50 ? "0px 2px 10px rgba(0, 0, 0, 0.3)" : "none"} // Only show shadow when scrolled and opaque
      zIndex={1000}
      transition="background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out" // Smooth transition
      color={navTextColor} // Set default text color
    >
      {/* Left Side: Logo */}
      <Flex flex="1" alignItems="center">
        <Link to="/">
          <Image src={Logo} h={{ base: "30px", md: "40px" }} />
          {/* Removed commented out text */}
        </Link>
      </Flex>

      {/* Center: Nav Links */}
      <Flex
        as="ul"
        listStyleType="none"
        gap={10} // Increased gap
        alignItems="center"
        display={{ base: "none", lg: "flex" }}
        flex="2"
        justifyContent="center"
      >
        {menu.map((menuItem) => (
          <li key={menuItem.name} className="group">
            <NavLink
              to={menuItem.hrefLink}
              className="relative inline-block pb-1 transition-colors duration-200" // Simplified classes
              style={({ isActive }) => ({
                color: isActive ? accentColor : navTextColor, // Use accent for active, default light for inactive
                fontWeight: isActive ? "600" : "500", // Slightly bolder active
                fontSize: "1.1rem", // Adjusted font size
                opacity: isActive ? 1 : 0.85, // Slightly fade inactive links
                _hover: { // Use Chakra's _hover prop style (applied via className or sx prop ideally, but inline for simplicity here)
                  color: accentColor,
                  opacity: 1,
                }
              })}
            >
              {({ isActive }) => (
                <>
                  <span className="transition-colors duration-200 hover:text-[#EF7826]">
                    {menuItem.name}
                  </span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </Flex>

      {/* Right Side: Get in Touch button + Mobile Icon */}
      <Flex flex="1" justifyContent="flex-end" alignItems="center" gap={4}>
        <Button
          variant="outline" // Outline style
          borderColor={accentColor}
          color={accentColor}
          display={{ base: "none", lg: "flex" }}
          rounded="full"
          px={7}
          // py={2} // Use default padding for outline
          _hover={{ bg: accentColor, color: "#121212" }} // Fill on hover, change text to dark
          fontSize="1.1rem" // Adjusted font size
          fontWeight="500"
          onClick={() => setIsModalOpen(true)}
        >
          Get in Touch
        </Button>

        {/* Mobile Menu Toggle */}
        {isMobile && (
          <Button
            onClick={toggleActive}
            bg="transparent"
            color={navTextColor} // Use light color for icon
            p={0}
            minW="auto"
            _hover={{ bg: "transparent", color: accentColor }} // Change color on hover
          >
            {active ? <HiX size={30} /> : <HiMenuAlt3 size={30} />}
          </Button>
        )}
      </Flex>

      {/* Mobile Menu Sliding Dropdown */}
      {isMobile && active && (
        <motion.div
          initial={false}
          animate={active ? "open" : "closed"}
          variants={{
            open: { x: 0 },
            closed: { x: "100%" },
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{
            position: "fixed",
            top: "70px", 
            right: 0,
            background: "#181818", 
            width: "100%",
            height: "auto", // Changed from calc(100vh - 70px)
            maxHeight: "calc(100vh - 70px)", // Added maxHeight
            overflowY: "auto", // Added for scrollability if content exceeds maxHeight
            padding: "2rem 1rem", 
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            zIndex: 999, 
            borderTop: `1px solid ${accentColor}` 
          }}
        >
          {menu.map((menuItem) => (
            <NavLink
              key={menuItem.name}
              to={menuItem.hrefLink}
              onClick={() => setActive(false)}
              style={({ isActive }) => ({
                position: "relative",
                textDecoration: "none",
                color: isActive ? accentColor : navTextColor, // Consistent colors
                fontWeight: isActive ? "bold" : "500",
                fontSize: "1.3rem", // Slightly larger for mobile tap targets
                padding: "10px 0",
                textAlign: "center",
                opacity: isActive ? 1 : 0.9,
                borderBottom: `1px solid ${'rgba(255, 255, 255, 0.1)'}` // Changed: No more orange underline for active item
              })}
            >
              {({ isActive }) => (
                <>
                  {menuItem.name}
                </>
              )}
            </NavLink>
          ))}
          <Button
            variant="solid" 
            bg={accentColor}
            color={"#121212"} 
            rounded="full"
            px={8}
            py={6} 
            _hover={{ bg: "#d66a1f" }} 
            fontSize="1.2rem"
            sx={{ marginTop: 'auto', paddingTop: '1.5rem' }} // Push to bottom, ensure some space above
            onClick={() => {
              setIsModalOpen(true); 
              setActive(false); 
            }}
          >
            Get in Touch
          </Button>
        </motion.div>
      )}
      {/* Modal will be rendered here */}
      <GetInTouchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Flex>
  );
};

export default Navbar;
