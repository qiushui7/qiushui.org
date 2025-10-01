-- Create post_views table
CREATE TABLE IF NOT EXISTS post_views (
  id SERIAL PRIMARY KEY,
  post_id VARCHAR(255) UNIQUE NOT NULL,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on post_id for faster queries
CREATE INDEX IF NOT EXISTS idx_post_views_post_id ON post_views(post_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_post_views_updated_at 
    BEFORE UPDATE ON post_views 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE post_views ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access" ON post_views
    FOR SELECT USING (true);

-- Create policies for public insert/update access
CREATE POLICY "Allow public insert access" ON post_views
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access" ON post_views
    FOR UPDATE USING (true);