import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: "qhvfriea",
  dataset: 'production',
  apiVersion: 'v1',
  token: "skfc8EcREwYmZX0rr21OWszZcOyrSf6FFaJ7v61Z7wLHQe6KCr4guECZ2cMK899u2EoMHmDtSlOQCpVOch8oyTYQJJ1jfeIc8A2UovH5ouy8q7ci7SQTRkSeagqARBGRF1KGKZhxjyHQr4aAMU9Rk0dgSh2b9gnsxFWWNlk2KsiyNclVF8yb",
  useCdn: false,
})