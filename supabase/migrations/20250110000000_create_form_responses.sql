-- Create form_responses table for the feedback form
CREATE TABLE IF NOT EXISTS public.form_responses (
  id BIGSERIAL PRIMARY KEY,
  submitted_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  prenom TEXT NOT NULL,
  nom TEXT NOT NULL,
  decouverte TEXT,
  conviction INTEGER,
  pourquoi_moi TEXT,
  declic_conversion TEXT,
  supports TEXT,
  hesitations TEXT,
  alternatives TEXT,
  temps_decision TEXT
);

-- Enable Row Level Security
ALTER TABLE public.form_responses ENABLE ROW LEVEL SECURITY;

-- Allow anonymous insert (anyone can submit the form)
CREATE POLICY "Allow anonymous insert" ON public.form_responses
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anonymous select (admin page loads responses)
CREATE POLICY "Allow anonymous select" ON public.form_responses
  FOR SELECT
  TO anon
  USING (true);

-- Allow anonymous delete (admin can delete responses)
CREATE POLICY "Allow anonymous delete" ON public.form_responses
  FOR DELETE
  TO anon
  USING (true);
