

const H1 = ({children}: {children: React.ReactNode}) => {
  return <h1 className="text-2xl font-bold bg-secondary w-max text-white p-2 rounded-md">{children}</h1>
}

const H2 = ({children}: {children: React.ReactNode}) => {
  return <h2 className="text-xl font-bold bg-primary w-max text-white p-2 rounded-md">{children}</h2>
}

const H3 = ({children}: {children: React.ReactNode}) => {
  return <h3 className="text-lg font-bold bg-primary text-white p-2 rounded-md">{children}</h3>
}

export {H1, H2, H3}