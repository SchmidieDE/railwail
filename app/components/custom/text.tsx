import Link from "next/link";
import Image from "next/image";

const H1 = ({ children, className, props }: { children: React.ReactNode, className?: string, props?: any }) => {
  return <h1 className={`text-4xl font-bold text-primary bg-primary ${className}`} {...props}>{children}</h1>;
};

const H2 = ({ children, className, props }: { children: React.ReactNode, className?: string, props?: any }) => {
  return <h2 className={`text-3xl font-bold ${className}`} {...props}>{children}</h2>;
};

const H3 = ({ children, className, props }: { children: React.ReactNode, className?: string, props?: any }) => {
  return <h3 className={`text-2xl font-bold ${className}`} {...props}>{children}</h3>;
};

const H4 = ({ children, className, props }: { children: React.ReactNode, className?: string, props?: any }) => {
  return <h4 className={`text-xl font-bold ${className}`} {...props}>{children}</h4>;
};

const H5 = ({ children, className, props }: { children: React.ReactNode, className?: string, props?: any }) => {
  return <h5 className={`text-lg font-bold ${className}`} {...props}>{children}</h5>;
};

const P = ({ children, className, props }: { children: React.ReactNode, className?: string, props?: any }) => {
  return <p className={`text-base ${className}`} {...props}>{children}</p>;
};

const NextLink = ({ children, href, className, props }: { children: React.ReactNode, href: string, className?: string, props?: any }) => {
  return <Link href={href} className={`text-primary ${className}`} {...props}>{children}</Link>;
};

const NextImage = ({ src, alt, className, props }: { src: string, alt: string, className?: string, props?: any }) => {
  return <Image src={src} alt={alt} className={`${className}`} {...props} />;
};




export { H1, H2, H3, H4, H5, P, NextLink, NextImage };

